import { spy, stub } from "@testing/mock";
import { after, before, describe, it } from "@testing/bdd";
import { expect } from "@expect";
import { logger } from "~logger";

import type { AuthRequest } from "~service/auth/auth.dto.ts";
import { WsBaseURL } from "~type/ws_config.type.ts";
import { WsAuth } from "~service/main.service.ts";
import { instrumentationSupportForTests } from "../../instrument_support.ts";

import { listarTratamentosMethod } from "~service/consult/listar_tratamentos/listar_tratamentos.service.ts";

describe("[CONSULT] - Listar Tratamentos", () => {
    const childStub = stub(logger, "getChild", () => logger);
    const infoSpy = spy(logger, "info");
    const baseUrl = WsBaseURL.SINIR;
    let token: string;

    before(async () => {
        const env = Deno.env.toObject();
        const login = {
            cpfCnpj: env.TEST_SINIR_CPF_ADMIN,
            senha: env.TEST_SINIR_PASSWORD,
            unidade: env.TEST_SINIR_UNIDADE,
        } as AuthRequest;

        token = await WsAuth(baseUrl, login, "TEST");
    });

    after(() => {
        // console.log(infoSpy.calls);
        childStub.restore();
        infoSpy.restore();
    });

    it("> Basic request", async () => {
        const consultTestFn = instrumentationSupportForTests(listarTratamentosMethod);

        const result = await consultTestFn({ baseUrl, token });
        expect(result).toEqual(
            expect.arrayContaining(
                [expect.objectContaining({
                    traCodigo: 61,
                    traDescricao: "Triagem e Transbordo",
                })],
            ),
        );
        expect(infoSpy.calls.length).toStrictEqual(4);
    });

    it("> Invalid token", async () => {
        const consultTestFn = instrumentationSupportForTests(listarTratamentosMethod);

        await expect(consultTestFn({ baseUrl, token: "INVALID_TOKEN" }))
            .rejects
            .toThrow(/Unauthorized/);
        expect(infoSpy.calls.length).toStrictEqual(5);
    });

    it("> Invalid URL", async () => {
        const consultTestFn = instrumentationSupportForTests(listarTratamentosMethod);

        await expect(consultTestFn({ baseUrl: "example.com" as WsBaseURL, token }))
            .rejects
            .toThrow(/Invalid URL/);
        expect(infoSpy.calls.length).toStrictEqual(6);
    });
});
