import {
    InventoryResponse,
    TeslaService,
    VehicleSpecs,
} from '@limphz/tesla-api-utilities';

import { Request, Response } from 'express';

const teslaService = new TeslaService();

export async function getInventory(req: Request, res: Response) {
    try {
        const inventory: InventoryResponse = await teslaService.getNewInventoryV4({ ...req.body } as VehicleSpecs);
        res.status(200).json(inventory);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}