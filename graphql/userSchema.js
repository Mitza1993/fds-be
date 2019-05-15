var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var UserModel = require('../models/User');

var userType = new GraphQLObjectType({
    name: 'user',
    fields: function() {
        return {
            id: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
            },
            role: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            },
            firstName: {
                type: GraphQLString
            },
            lastName: {
                type: GraphQLString
            },
            displayName: {
                type: GraphQLString
            },
            phone: {
                type: GraphQLString
            },
            address: {
                type: GraphQLString
            },
            authToken: {
                type: GraphQLString
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function() {
        return {
            users: {
                type: new GraphQLList(userType),
                resolve: function() {
                    const users = UserModel.find().exec()
                    if (!users) {
                        throw new Error('Error')
                    }
                    return users;
                }
            },
            user: {
                type: userType,
                args: {
                    id: {
                        name: 'id',
                        type: GraphQLString
                    }
                },
                resolve: function(root, params) {
                    const userDetails = UserModel.findById(params.id).exec()
                    if (!userDetails) {
                        throw new Error('Error')
                    }
                    return userDetails;
                }
            }
        }
    }
})

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function() {
        return {
            addUser: {
                type: userType,
                args:{
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    role: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    password: {
                        type: new GraphQLNonNull(GraphQLString) },
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    displayName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    phone: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    address: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    authToken: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve : function(root, params) {
                    const userModel = new UserModel(params);
                    const newUser =  userModel.save();
                    if(!newUser) {
                        throw new Error('Error');
                    }
                    return newUser;
                }
            },
            updateUser: {
                type: userType,
                args:{
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    role: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    password: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    firstName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    lastName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    displayName: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    phone: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    address: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    authToken: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    return UserModel.findByIdAndUpdate(params.id, {
                        email: params.email,
                        role: params.role,
                        password: params.password,
                        firstName: params.firstName,
                        lastName: params.lastName,
                        displayName: params.displayName,
                        phone: params.phone,
                        address: params.address,
                        authToken: params.authToken
                    }, function(err) {
                        if(err) return next(err);
                    })
                }
            },
            removeUser: {
                type: userType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remUser = UserModel.findByIdAndRemove(params.id).exec();
                    if(!remUser) {
                        throw new Error('Error');
                    }
                    return remUser;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
