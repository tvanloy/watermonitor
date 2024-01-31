"use client";

import Link from "next/link";
import { useState } from "react";
import { Table } from "reactstrap";

import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sensor } from "@/types/general";
import { Icon } from "@iconify/react";

const SensorTable = ({ sensorData }: { sensorData: Sensor[] }) => {
  const [sensors, setSensors] = useState(sensorData);

  return (
    <Table>
      <TableCaption>A table of all the sensors in the system.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Sensor ID</TableHead>
          <TableHead>Municipality</TableHead>
          <TableHead>MAC Address</TableHead>
          <TableHead>Station Name</TableHead>
          <TableHead>(Longitude | Latitude)</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sensors.map((sensor, i) => (
          <TableRow key={sensor.id}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{sensor.id}</TableCell>
            <TableCell>{sensor.municipality}</TableCell>
            <TableCell>{sensor.mac_address}</TableCell>
            <TableCell>{sensor.station_name}</TableCell>
            <TableCell>
              {sensor.longitude &&
                sensor.latitude &&
                `(${sensor.longitude},${sensor.latitude})`}
            </TableCell>
            <TableCell className="flex text-2xl gap-2">
              <Link
                href={`/dashboard/sensor?id=${sensor.id}&action=edit`}
                className="cursor-pointer"
              >
                <Icon icon="mdi:pencil" />
              </Link>
              <Icon
                className="cursor-pointer"
                icon="mdi:delete"
                onClick={async () => {
                  const response = await fetch(`/api/sensor`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                      id: sensor.id,
                    }),
                  });

                  if (response.ok) {
                    const deletedSensor: Sensor = await response.json();

                    setSensors(
                      sensors.filter((s) => {
                        return s.id !== deletedSensor.id;
                      })
                    );
                  }
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SensorTable;
