'use strict'
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: {
      type:DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if (dado.length < 3) throw new Error('O campo nome deve ter mais de três caracteres')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate:{ //medoto do sequelize que vc pode colocar as validações dentro
        isEmail: { //metodo sequelize que valida o email
         args: true, //se o argumento for verdadeiro
         msg: 'dados do tipo e-mail inválidos'      //mensagem de erro caso não for verdadeiro
       }
      }
   },
    role: DataTypes.STRING
  }, { 
    paranoid: true, //enquanto paranoid for true agente garante que nenhum registro vai ser deletado da tabela//escopos padroes 
    defaultScope: { //oque eu queroi que acontece no meu get padrao
      where:{
        ativo: true //que só retorne os que tiveram ativo true
      }
    },
    scopes: { // todos os escoppos não padores
      todos: {  where: { } }
      //etc: { constraint: valor} // outros condiçoes que quiser colocar
    }
  })
  Pessoas.associate = function(models) {
    Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_id'
    }) 
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id',
      scope: { status: 'confirmado'},
      as: 'aulasMatriculadas' //é o nome que estou dando para o escopo
    })

  }
  return Pessoas
}