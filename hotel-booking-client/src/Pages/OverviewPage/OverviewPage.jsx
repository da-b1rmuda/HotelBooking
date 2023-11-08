import dayjs from 'dayjs';
import React from 'react';
import { Card, Tag } from 'antd';
import { getFullDate } from '../../services/functionService';
import './OverviewPage.css';
import ReactECharts from 'echarts-for-react';
import { optionVisitors, optionActivityGuest, optionAvailableRooms } from './optionsCharts';

const OverviewPage = () => {
  return (
    <div>
      <div className="overview-day">
        <p style={{ fontSize: '2vh', paddingBottom: '3vh' }}>{getFullDate(dayjs())}</p>
      </div>
      <div className="overview-card__text">
        <Card style={{ marginBottom: '3vh' }}>
          <p>Обзор</p>
          <div className="d-f overview-card__overview">
            <div className="d-f">
              <div className="d-f" style={{ marginRight: '11vh' }}>
                <div className="d-f ai-c">
                  <img src="image/1.png" alt="img" style={{ width: '8vh', height: '8vh' }} />
                </div>
                <div
                  className="overview-card__overview__text d-f fd-c jc-c"
                  style={{ paddingLeft: '2vh' }}>
                  <p>₽345,000</p>
                  <p>Выручка за месяц</p>
                </div>
              </div>
              <div className="d-f">
                <div>
                  <img src="image/plus.png" alt="img" style={{ width: '20vh' }} />
                </div>
                <div
                  className="overview-card__overview__text d-f fd-c jc-c"
                  style={{ paddingLeft: '2vh', width: '18vh' }}>
                  <p style={{ color: '#89D69D' }}>+5.3%</p>
                  <p>
                    Чем в прошлом <br /> месяце
                  </p>
                </div>
              </div>
            </div>
            <div
              className="d-f jc-sb overview-card__overview__block"
              style={{ width: '100%', marginLeft: '6vh' }}>
              <div
                className="d-f jc-sb ai-c"
                style={{ backgroundColor: '#3B92FF', padding: '2vh' }}>
                <div
                  className="overview-card__overview__block__text"
                  style={{ width: '100%', paddingLeft: '2vh' }}>
                  <p>828</p>
                  <p>Новых гостей</p>
                </div>
                <div>
                  <img src="image/2.png" alt="img" style={{ width: '8vh', height: '8vh' }} />
                </div>
              </div>
              <div
                className="d-f jc-sb ai-c"
                style={{ backgroundColor: '#5571C9', padding: '2vh' }}>
                <div
                  className="overview-card__overview__block__text"
                  style={{ width: '100%', paddingLeft: '2vh' }}>
                  <p>107</p>
                  <p>Комнат</p>
                </div>
                <div>
                  <img src="image/3.png" alt="img" style={{ width: '8vh', height: '8vh' }} />
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className="d-f overview-card__room__container">
          <Card style={{ width: '60%' }}>
            <div className="overview-card__room">
              <p style={{ marginBottom: '3vh' }}>Статистика комнат</p>
              <div className="d-f jc-sb status-room__text">
                <div style={{ width: '45%' }}>
                  <div className="d-f fd-c status-room__list">
                    <div>
                      <p>Забронированные комнаты</p>
                      <Tag>
                        <p>104</p>
                      </Tag>
                    </div>
                    <div>
                      <p>Чистые</p>
                      <Tag>
                        <p>70</p>
                      </Tag>
                    </div>
                    <div>
                      <p>Грязные</p>
                      <Tag>
                        <p>14</p>
                      </Tag>
                    </div>
                    <div>
                      <p>Проверено</p>
                      <Tag>
                        <p>90</p>
                      </Tag>
                    </div>
                  </div>
                </div>
                <div style={{ width: '45%' }}>
                  <div className="d-f fd-c status-room__list">
                    <div>
                      <p>Забронированные комнаты</p>
                      <Tag>
                        <p>104</p>
                      </Tag>
                    </div>
                    <div>
                      <p>Чистые</p>
                      <Tag>
                        <p>70</p>
                      </Tag>
                    </div>
                    <div>
                      <p>Грязные</p>
                      <Tag>
                        <p>14</p>
                      </Tag>
                    </div>
                    <div>
                      <p>Проверено</p>
                      <Tag>
                        <p>90</p>
                      </Tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card style={{ width: '36%' }}>
            <div className="overview-card__room">
              <div>
                <p>Посетители</p>
                <ReactECharts option={optionVisitors} style={{ width: '90%', height: '30vh' }} />
              </div>
            </div>
          </Card>
        </div>
        <div className="d-f overview-card__room__container">
          <Card style={{ width: '68%', marginBottom: '3vh' }}>
            <div className="overview-card__guests">
              <p>Активность гостей</p>
              <ReactECharts option={optionActivityGuest} />
            </div>
          </Card>
          <Card style={{ width: '28%', marginBottom: '3vh' }}>
            <div className="overview-card__guests">
              <p>Свободные комнаты</p>
              <ReactECharts option={optionAvailableRooms} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
