const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

// HubSpot API configuration
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3';

// Function to create/update contact in HubSpot
async function syncContactWithHubSpot(contactData) {
    try {
        const { email, name, comment } = contactData;
        
        // Prepare contact data for HubSpot
        const hubspotContact = {
            properties: {
                email: email,
                firstname: name.split(' ')[0],
                lastname: name.split(' ').slice(1).join(' ') || '',
                comments: comment || '',
                source: 'SOLSHR Website',
                createdate: new Date().toISOString()
            }
        };

        // Check if contact exists in HubSpot
        const searchResponse = await axios.get(`${HUBSPOT_API_URL}/objects/contacts/search`, {
            headers: {
                'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: {
                filterGroups: [{
                    filters: [{
                        propertyName: 'email',
                        operator: 'EQ',
                        value: email
                    }]
                }]
            }
        });

        let contactId;
        if (searchResponse.data.total > 0) {
            // Update existing contact
            contactId = searchResponse.data.results[0].id;
            await axios.patch(
                `${HUBSPOT_API_URL}/objects/contacts/${contactId}`,
                hubspotContact,
                {
                    headers: {
                        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        } else {
            // Create new contact
            const createResponse = await axios.post(
                `${HUBSPOT_API_URL}/objects/contacts`,
                hubspotContact,
                {
                    headers: {
                        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            contactId = createResponse.data.id;
        }

        return contactId;
    } catch (error) {
        console.error('Error syncing with HubSpot:', error);
        throw error;
    }
}

// Cloud Function to listen for new responses
exports.syncWithHubSpot = functions.database
    .ref('/responses/{responseId}')
    .onCreate(async (snapshot, context) => {
        try {
            const responseData = snapshot.val();
            const contactId = await syncContactWithHubSpot(responseData);
            
            // Update Firebase record with HubSpot contact ID
            await snapshot.ref.update({
                hubspotContactId: contactId,
                syncedAt: admin.database.ServerValue.TIMESTAMP
            });

            return null;
        } catch (error) {
            console.error('Error in syncWithHubSpot function:', error);
            throw error;
        }
    }); 