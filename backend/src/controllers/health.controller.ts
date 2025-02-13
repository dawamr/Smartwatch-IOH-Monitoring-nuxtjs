import { Request, Response } from 'express';
import { pool } from '../index';
import { Health } from '../interfaces/types';

export const getHealthData = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "Health" WHERE status = $1 limit 1000', ['published']);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan saat mengambil data kesehatan' });
  }
};

export const getHealthByDeviceId = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    const { start_date, end_date } = req.query;

    let query = `
      SELECT * FROM "Health"
      WHERE device_id = $1
      AND status = 'published'
    `;
    const queryParams: any[] = [deviceId];

    if (start_date && end_date) {
      query += ` AND start_time_utc BETWEEN $2 AND $3`;
      queryParams.push(new Date(start_date as string).toISOString(), new Date(end_date as string).toISOString());
    }

    query += ' ORDER BY start_time_utc DESC LIMIT 1000';

    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error('Error in getHealthByDeviceId:', error);
    res.status(500).json({ error: 'Kesalahan saat mengambil data kesehatan' });
  }
};
