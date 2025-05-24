import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getInventory } from './controllers/inventoryController';

// Lambda handler function
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Convert API Gateway event to Express request
  const path = event.path;
  const httpMethod = event.httpMethod;
  const headers = event.headers || {};
  const queryStringParameters = event.queryStringParameters || {};
  const body = event.body ? JSON.parse(event.body) : {};

  try {
    // Process the request using your existing routes
    // This is a simplified example - you'll need to adapt based on your app structure
    const result = await processRequest(path, httpMethod, headers, queryStringParameters, body);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

// Helper function to process requests
async function processRequest(path: string, method: string, headers: any, query: any, body: any) {
  // Map to your existing controller functions based on path and method
  // This will need to be customized based on your actual route structure
  
  // Example:
  if (path.startsWith('/api/tesla') && method === 'GET') {
    if (path.indexOf('inventory') >= 0) {
      // Mock req and res objects for controller compatibility
      return await new Promise((resolve, reject) => {
        const req = { headers, query, body };
        const res = {
          status: (statusCode: number) => ({
            json: (data: any) => resolve({ statusCode, data })
          }),
          json: (data: any) => resolve({ statusCode: 200, data })
        };
        getInventory(req as any, res as any).catch(reject);
      });
    }
  }
  
  // Add mappings for all your endpoints
  
  throw new Error(`Unsupported path: ${path}, method: ${method}`);
}