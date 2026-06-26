import { Item } from './item-request';

export class TradeUser {
    idUser: number = 0;
    emailUser: string = '';
    usernameUser: string = '';
}

export class Trade {
    idTrade: number = 0;
    statusTrade: string = '';
    created_atTrade: string = '';
    completed_atTrade: string | null = null;
    proposer?: TradeUser;
    receiver?: TradeUser;
    proposerItems: Item[] = [];
    receiverItems: Item[] = [];
    chatId: number | null = null;
}
