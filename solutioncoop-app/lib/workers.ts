import fs from 'fs';
import path from 'path';

export interface WorkerItem {
  id: string;
  name: string;
  company: string;
  img: string;
  nationality: string;
}

const dataFilePath = path.join(process.cwd(), 'data', 'workers.json');

export function getWorkers(): WorkerItem[] {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return [];
    }
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents) as WorkerItem[];
  } catch (error) {
    console.error('Error reading workers data:', error);
    return [];
  }
}

export function saveWorkers(workers: WorkerItem[]) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(workers, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving workers data:', error);
  }
}
