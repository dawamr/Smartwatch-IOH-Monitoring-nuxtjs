import { Request, Response } from 'express';
import { pool } from '../index';
import { Device } from '../interfaces/types';

export const getDevices = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM "Device" WHERE status = $1', ['published']);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan saat mengambil data device' });
  }
};

export const getDeviceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM "Device" WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Device tidak ditemukan' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan saat mengambil data device' });
  }
};
