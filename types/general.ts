export type Station = {
  station: string;
  municipality: string;
  province: string;
  threshold: number;
};

export type Municipality = {
  id: string;
  province: string;
  name: string;
};

export type Sensor = {
  id: string;
  municipality: string;
  station_name: string;
  mac_address: string;
  image: string;
  longitude: number;
  latitude: number;
};

export const NodeRedAuthHeaders = new Headers({
  Authorization:
    "Basic " +
    Buffer.from(
      process.env.API_USERNAME + ":" + process.env.API_PASSWORD
    ).toString("base64"),
});