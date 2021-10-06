import corona from './corona.json';
import { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Main() {

  let areaName = new Array();
  let [city, setCity] = useState('korea');

  for (let key in corona) {
    if (corona[key].countryName !== undefined) {
      areaName.push({
        "kr": corona[key].countryName,
        "en": key
      })
    }
  }

  let areaChange = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  }

  const [data, setData] = useState();

  useEffect(() => {

    let totalCase = parseInt(corona[city].totalCase.replaceAll(',', '')),
      newCase = parseInt(corona[city].newCase),
      recovered = parseInt(corona[city].recovered.replaceAll(',', '')),
      death = parseInt(corona[city].death.replaceAll(',', '')),
      care = totalCase - (recovered + death);

    setData([
      {
        name: '확진자',
        '인원': totalCase,
        '추가': newCase
      },
      {
        name: '검사중',
        '인원': care
      },
      {
        name: '격리해제',
        '인원': recovered
      },
      {
        name: '사망자',
        '인원': death
      }

    ])
  }, [city]); //useEfferct end , [] = 딱 한번만 실행, 값 넣어주면 재실행


  return (
    <>
      <main>
        <article className="kor">
          <h2>국내현황</h2><p>2021.10.06. 00:00 집계기준</p>
          <div>
            <span>확진환자({corona['korea'].totalCase})</span>
            <span>격리해제({corona['korea'].recovered})</span>
            <span>사망자({corona['korea'].death})</span>
          </div>
          <div>
            <span>일일확진자({corona['korea'].newCase})</span>
            <span>국내발생({corona['korea'].newCcase})</span>
            <span>해외유입({corona['korea'].newFcase})</span>
          </div>
        </article>

        <article className="area">
          <h2>지역현황</h2>
          <div>
            <select onChange={areaChange}>
              {
                areaName.map(tit => {
                  return (<option key={tit.en} value={tit.en}>
                    {tit.kr}
                  </option>);
                })
              }
            </select>
            <p>※ 원하시는 지역을 선택해주세요.</p>

            <table>
              <caption>{corona[city].countryName}</caption>
              <thead>
                <tr>
                  <th>확진자</th><th>완치자</th><th>사망자</th><th>발생률</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {corona[city].totalCase}명
                    (+{corona[city].newCase})
                  </td>
                  <td>{corona[city].recovered}명</td>
                  <td>{corona[city].death}</td>
                  <td>{corona[city].percentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <div className="App">
          {/* <button onClick={change}>차트변경</button> */}

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="인원" stackId="a" fill="#82ca9d" />
              <Bar dataKey="추가" stackId="a" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </main>

    </>
  );
}

export default Main;
