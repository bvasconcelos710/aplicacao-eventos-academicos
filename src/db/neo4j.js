var neo4j = require('neo4j-driver');

var driver = neo4j.driver(
    'neo4j://localhost',
    neo4j.auth.basic('neo4j', 'neo4j123')
);


async function criarNoUser(nome, id) {
    var session = driver.session();
    await session.run('CREATE (u:User{nome:$nome, idmongo:$id})', { nome, id });
    session.close();
}

async function criarNoEvento(titulo, id) {
    var session = driver.session();
    await session.run('CREATE (e:Evento{titulo:$titulo, idmongo:$id})', { titulo, id });
    session.close();
}

async function criarRelacionamento(userId, eventoId) {
    try {
        var session = driver.session();
        await session.run('MATCH (u:User {idmongo:$userId}) , (e:Evento {idmongo:$eventoId}) CREATE (u)-[:INSCRITO]->(e)', {
            userId: userId,
            eventoId: eventoId
        }).then(result => console.log(result.summary.counters._stats.relationshipsCreated));
        session.close();
    } catch (error) {
        console.log(error);
    }
}

async function buscarEventosUser(userId) {
    try {
        var session = driver.session();
        const result = await session.run(
            'MATCH (u:User {idmongo: $userId})-[:INSCRITO]->(e:Evento) RETURN e.idmongo AS idmongo',
            { userId }
        );
        session.close();

        const eventosInscritos = result.records.map((record) => record.get('idmongo'));
        return eventosInscritos;

    } catch (error) {
        console.error(error);
    }
}

async function buscarEventosRecomendados(userId) {
    try {
        var session = driver.session();
        const result = await session.run(
            'MATCH (u:User {idmongo: $userId})-[:INSCRITO]->(:Evento)<-[:INSCRITO]-(outro:User)-[:INSCRITO]->(eventoRecomendado:Evento) WHERE NOT (u)-[:INSCRITO]->(eventoRecomendado) RETURN eventoRecomendado.idmongo AS idmongo',
            { userId }
        );
        session.close();

        const eventosRecomendados = result.records.map((record) => record.get('idmongo'));
        return eventosRecomendados;

    } catch (error) {
        console.log(error);
    }
}

module.exports = { criarNoUser, criarNoEvento, criarRelacionamento, buscarEventosUser, buscarEventosRecomendados };