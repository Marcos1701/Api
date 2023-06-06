import { Request, Response } from 'express'

import { client } from './conf_bd_pg.js'
import { v4 as uuid } from 'uuid'

const validastring = (id: string) => {
    if (id === '' || id === undefined || id === null) {
        return false
    }
    return true
}

(async () => {
    try {
        await client.connect()

        //     await client.query(`
        //     CREATE TABLE IF NOT EXISTS Users (
        //         id uuid PRIMARY KEY,
        //         name varchar(255) NOT NULL,
        //         email varchar(255) NOT NULL,
        //         password varchar(255) NOT NULL
        //     );
        // // `);
        //     await client.query(`
        //     CREATE TABLE IF NOT EXISTS Tasks (
        //         id uuid PRIMARY KEY,
        //         title varchar(255) NOT NULL,
        //         description varchar(255) NOT NULL,
        //         status varchar(255) NOT NULL,
        //         date timestamp NOT NULL DEFAULT NOW(),
        //         user_id uuid NOT NULL,
        //         FOREIGN KEY (user_id) REFERENCES Users(id)
        //     );
        // `);


        await client.query(`
    CREATE TABLE IF NOT EXISTS Tasks (
        id varchar PRIMARY KEY,
        title varchar(255) NOT NULL,
        description varchar(255) NOT NULL,
        status char(1) NOT NULL DEFAULT 'P', 
        date DATE NOT NULL DEFAULT NOW(),
    );
`); // P = Pendente, C = Concluída, A = Atrasada


        console.log("Banco de dados conectado com sucesso!!")
        // console.log("Tabelas criadas com sucesso!")
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Erro ao criar tabelas: ${err.message}`)
        }
    }
})();


export const getTasks = async (req: Request, res: Response) => {
    try {
        const response = await client.query(`SELECT * FROM Tasks`)
        res.status(200).json(response.rows)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
    }
}

export const getTaskById = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!validastring(id)) {
        res.status(400).json({ message: "ID inválido" })
    }
    try {
        const response = await client.query(`SELECT * FROM Tasks WHERE id = $1`, [id])
        res.status(200).json(response.rows)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message })
        }
    }
}

export const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body
    if (!validastring(title) || !validastring(description)) {
        res.status(400).json({ message: "Dados inválidos" })
    }
    try {
        const id: string = uuid()
        await client.query(`INSERT INTO Tasks (id,title, description) VALUES ($1, $2, $3)`, [id, title, description])
        res.status(201).json({ id: id })
    } catch (err) {
        if (err instanceof Error) {
            res.status(500)
        }
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!validastring(id)) {
        res.status(400)
    }
    try {
        await client.query(`DELETE FROM Tasks WHERE id = $1`, [id])
        res.status(204)
    } catch (err) {
        if (err instanceof Error) {
            res.status(500)
        }
    }
}