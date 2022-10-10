import * as net from 'net';
import { serverListner } from './serverlistner';

net.createServer(serverListner)