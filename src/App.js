import { useEffect, useState } from 'react';
import CountrySelector from './components/CountrySelector';
import Highlight from './components/Highlight';
import Summary from './components/Summary';
import { getCountries, getReportByCountry } from './api/index';
import { sortBy } from 'lodash';
import { Container, Typography } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/vi';
import '@fontsource/roboto';

moment.locale('vi');
function App() {
  const [countries, setCountries] = useState([]);
  const [selectedContryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      console.log(res);

      const countries = sortBy(res.data,'Country');
      setCountries(countries);

      setSelectedCountryId('vn');
    });
  }, []);

  const handleOnChange = (e) => {
    setSelectedCountryId(e.target.value);
  };

  useEffect(() => {
    if (selectedContryId) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedContryId
      );

      getReportByCountry(Slug).then((res) => {
        // console.log('getReportByCountry", { res })
        res.data.pop(); //xoa di item cuoi cung
        setReport(res.data);
      });
    }
  }, [countries, selectedContryId]);
  return (
    <Container style={{marginTop: 20}}>
      <Typography variant='h2' component='h2'>
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format('LLL')}</Typography>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedContryId}/>
      <Highlight report={report} />
      <Summary countryId={selectedContryId} report={report} />
    </Container>
  );
}

export default App;
