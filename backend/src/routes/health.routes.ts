import { Router } from 'express';
import { getHealthData, getHealthByDeviceId } from '../controllers/health.controller';

const router = Router();

router.get('/', getHealthData);
router.get('/device/:deviceId', getHealthByDeviceId);

export default router;
