import { Request, Response } from 'express';
import { pool } from '../index';
import { SleepReport } from '../interfaces/types';
import moment from 'moment';

export const getSleepData = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "SleepReport" WHERE status = $1 LIMIT 500', ['published']);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan saat mengambil data tidur' });
  }
};

export const getSleepByDeviceId = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    const { startDate, endDate } = req.query;

    // get day of week using moment
    const date = moment(startDate as string).format('YYYY-MM-DD');
    const dayOfMonth = parseInt(date.split('-')[2]);
    const month = parseInt(date.split('-')[1]);
    const year = parseInt(date.split('-')[0]);
    console.log(startDate, dayOfMonth, month, year);

    let query = 'SELECT * FROM "SleepReport" WHERE device_id = $1 AND type = 1';
    const queryParams: any[] = [deviceId];

    if (dayOfMonth && month) {
      query += ' AND "recordDay" = $2 AND "recordMonth" = $3 AND "recordYear" = $4';
      queryParams.push(dayOfMonth, month, year);
    }

    query += ' ORDER BY "type" ASC';

    console.log(query, queryParams);
    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
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
