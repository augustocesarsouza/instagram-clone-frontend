import * as signalR from '@microsoft/signalr';
import { Following } from './AppContent';
import React from 'react';

interface EmailProps{
  email: string;
  isOnline: boolean;
}

export const initializeSignalRConnection = async (
  connection: signalR.HubConnection | null, 
  emailUsers: string[] | null,
  emailConnection: string | null, 
  setConnection: React.Dispatch<React.SetStateAction<signalR.HubConnection | null>>, 
  setMyFollowing: React.Dispatch<React.SetStateAction<Following[]>>) => {

  if (connection === null && emailUsers !== null) {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7266/chat')
      .build();
    setConnection(newConnection);

    newConnection.on('UserConnection', (email) => {
      
      setMyFollowing((s) => {
        const myFollowings = s.map((f) => {
          if(f.email == email){
            f.isOnline = true;
          }
          return f;
        });
        return myFollowings;
      });
    });

    newConnection.on('UserDisconnected', (email, userDisconnectedTime) => {
      setMyFollowing((s) => {

        const myFollowingDisconnected = s.map((f) => {
          if(f.email == email){
            f.isOnline = false;
            const currentTime = new Date();

            const lastDisconnected = new Date(userDisconnectedTime);
            
            const timeDiff = Math.floor((currentTime.getTime() - lastDisconnected.getTime()) / 60000);

            
            f.lastDisconnectedTimeMinutes = timeDiff
          }
          return f;
        });

        return myFollowingDisconnected;
      });
    });

    newConnection.on('IsOnline', (email: EmailProps[]) => {
      setMyFollowing((s) => {
        s.forEach((f) => {
          email.forEach((e) => {
            if (f.email == e.email) {
              f.isOnline = e.isOnline;
            }
          });
        });
        return [...s];
      });

      setMyFollowing((s) => {
        s.forEach((f) => {
          email.forEach((e) => {
            if (f.isOnline == false && f.email == e.email) {
              const currentTime = new Date();

              const lastDisconnectedMoment = new Date(f.lastDisconnectedTime);
              
              const timezoneOffSet = lastDisconnectedMoment.getTimezoneOffset();

              lastDisconnectedMoment.setMinutes(lastDisconnectedMoment.getMinutes() - timezoneOffSet);
              
              const timeDiff = Math.floor((currentTime.getTime() - lastDisconnectedMoment.getTime()) / 60000);
              
              f.lastDisconnectedTimeMinutes = timeDiff;
            }
          });
        });
        return [...s];
      });

      const MINUTE_IN_MS = 60000;
      const HOUR_IN_MS = 3600000;
      const DAY_IN_MS = 86400000;
      const WEEK_IN_MS = 604800000;
      const MES_IN_MS = 2678400000;
      //const ANO_IN_MS = 31536000.00;

      setMyFollowing((mf) => {
        const updatedFollowing = mf.map((f) => {
          if (!f.isOnline) {
            
            const lastDisconnectedTimeMs = f.lastDisconnectedTimeMinutes * MINUTE_IN_MS;
            let measureOfTime = 'minuto';
            let disconnectedTime = lastDisconnectedTimeMs;


            if (disconnectedTime >= MES_IN_MS) {
              measureOfTime = 'mes';
              disconnectedTime /= MES_IN_MS;
              disconnectedTime = Math.floor(disconnectedTime);
            } else if (disconnectedTime >= WEEK_IN_MS) {
              measureOfTime = 'semana';
              disconnectedTime /= WEEK_IN_MS;
            } else if (disconnectedTime >= DAY_IN_MS) {
              measureOfTime = 'dia';
              disconnectedTime /= DAY_IN_MS;
            } else if (disconnectedTime >= HOUR_IN_MS) {
              measureOfTime = 'hora';
              disconnectedTime /= HOUR_IN_MS;
            } else {
              disconnectedTime /= MINUTE_IN_MS;
            }

            disconnectedTime = Math.min(
              Math.floor(disconnectedTime),
              measureOfTime === 'semana' ? 4 : 59
            );

            return {
              ...f,
              measureOfTime,
              lastDisconnected: disconnectedTime,
            };
          }
          return f;
        });
        return updatedFollowing;
      });
    });

    try {
      await newConnection.start();
      newConnection.invoke('OnConnectedAsync', emailConnection, emailUsers);
      newConnection.invoke('Verficar', emailUsers);
    } catch (error) {
      console.error('Error establishing SignalR connection:', error);
    }

    window.addEventListener(
      'beforeunload',
      (e) => {
        e.preventDefault();

        newConnection.invoke('OnDisconnectedAsync', emailConnection, emailUsers);
      },
      true
    );
  }
};