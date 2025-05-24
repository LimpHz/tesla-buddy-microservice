import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { TeslaService, VehicleSpecs } from '@limphz/tesla-api-utilities';

// Lambda handler function
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const path = event.path;
    const method = event.httpMethod;
    const queryParams = event.queryStringParameters || {};
    const teslaService = new TeslaService();
    
    let result;
    
    // Simple router implementation
    if (path === '/api/tesla/inventory' && method === 'GET') {
      const bodyObj = event.body ? JSON.parse(event.body) : {};
      result = await teslaService.getNewInventoryV4({ ...bodyObj } as VehicleSpecs);
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not found' })
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};