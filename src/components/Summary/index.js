import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import LineChart from '../Charts/LineChart';
import HighMaps from '../Charts/HighMaps';
import { getMapDataByCountryId } from '../../api'

export default function Summary({countryId, report}) {

  const [mapData, setMapData] = useState({});

  useEffect(() => {
    if (countryId) {
      const mapData = 
      import(`@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`).then((res) => setMapData(res));
    };

  }, [countryId]);

  return (
    <div style={{ height: '500px', marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}
