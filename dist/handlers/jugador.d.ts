import { Request, Response } from "express";
export declare const getJugador: (req: Request, res: Response) => Promise<void>;
export declare const getJugadorById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createJugador: (req: Request, res: Response) => Promise<void>;
export declare const updateJugador: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updatePosicion: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteJugador: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
