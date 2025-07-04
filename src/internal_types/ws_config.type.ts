/*
 * Copyright (c) 2025, Stallone L. de Souza (@stallone-dev)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export { type WsBase, WsBaseURL, type WsClientConfig, type WsMethodContext, type WsResponseModel, type WsUserRole };

type WsUserRole = "GERADOR" | "TRANSPORTADOR" | "DESTINADOR";

type WsBase = "SINIR" | "SIGOR";

interface WsClientConfig<R extends WsUserRole = WsUserRole> {
    baseWebServer: WsBase;
    role: R;
    cpf: string;
    senha: string;
    unidade: string;
    persistentId?: string;
}

interface WsResponseModel<T> {
    erro: boolean;
    mensagem: string;
    objetoResposta: T;
    totalRecords: number;
}

interface WsMethodContext {
    token: string;
    baseUrl: string;
}

enum WsBaseURL {
    SINIR = "https://admin.sinir.gov.br/apiws/rest",
    SIGOR = "https://mtrr.cetesb.sp.gov.br/apiws/rest",
}
