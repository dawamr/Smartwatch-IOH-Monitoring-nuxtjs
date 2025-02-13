import { Request, Response } from 'express';
import { pool } from '../index';
import { SleepReport } from '../interfaces/types';

export const getSleepData = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "SleepReport" WHERE status = $1', ['published']);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan saat mengambil data tidur' });
  }
};

export const getSleepByDeviceId = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    const { startDate, endDate } = req.query;

    let query = 'SELECT * FROM "SleepReport" WHERE device_id = $1';
    const queryParams: any[] = [deviceId];

    if (startDate && endDate) {
      query += ' AND date_created BETWEEN $2 AND $3';
      queryParams.push(startDate, endDate);
    }

    query += ' ORDER BY date_created DESC';

    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan saat mengambil data tidur' });
  }
};

export const getSleepQualityStats = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    const result = await pool.query(
      `
      SELECT
        AVG(sleep_quality) as avg_quality,
        AVG(sleep_total_time) as avg_duration,
        COUNT(*) as total_records
      FROM "SleepReport"
      WHERE device_id = $1
      AND status = 'published'
    `,
      [deviceId],
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan saat mengambil statistik tidur' });
  }
};
