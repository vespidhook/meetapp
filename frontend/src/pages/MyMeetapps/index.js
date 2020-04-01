/* MODULES */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {
  MdAddCircleOutline,
  MdChevronRight,
  MdSentimentDissatisfied,
} from 'react-icons/md';

/* COMPONENTS */
import Loader from 'react-loader-spinner';

/* SERVICES */
import api from '~/services/api';
import history from '~/services/history';

/* STYLES */
import { Container, NoMeetapps, MeetappCard } from './styles';

export default function MyMeetapps() {
  /* STATES */
  const [meetapps, setMeetapps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeetapps() {
      const response = await api.get('meetapps', {
        params: { where: 'just-my-meetapps' },
      });
      const data = response.data.map(m => ({
        ...m,
        formattedDate: format(parseISO(m.date), "d 'de' MMMM ', às' hh'h'mm", {
          locale: pt,
        }),
      }));
      setLoading(false);
      setMeetapps(data);
    }
    loadMeetapps();
  }, []);

  return (
    <Container>
      {loading ? (
        <div className="loading">
          <Loader type="Grid" color="#f94d6a" width={164} height={164} />
        </div>
      ) : (
          <>
            <header>
              <strong>Meus Meetapps</strong>
              <button type="button" onClick={() => history.push('/meetapp-new')}>
                <MdAddCircleOutline />
              Novo Meetapp
            </button>
            </header>

            {meetapps.length > 0 ? (
              <ul>
                {meetapps.map(meetapp => (
                  <MeetappCard
                    key={String(meetapp.id)}
                    style={{
                      opacity: !meetapp.canceled_at && !meetapp.past ? 1 : 0.5,
                    }}
                  >
                    <Link to={`meetapp-details/${meetapp.id}`}>
                      {!meetapp.canceled_at ? (
                        <strong>{meetapp.title}</strong>
                      ) : (
                          <span>
                            <strike>{meetapp.title}</strike>
                            <strong>Canceled</strong>
                          </span>
                        )}
                      <time>{meetapp.formattedDate}</time>
                      <MdChevronRight size={24} color="#fff" />
                    </Link>
                  </MeetappCard>
                ))}
              </ul>
            ) : (
                <NoMeetapps>
                  <MdSentimentDissatisfied color="#fff" size={40} />
                  <span>Ups! Não há meetapp para este mês!</span>
                </NoMeetapps>
              )}
          </>
        )}
    </Container>
  );
}
