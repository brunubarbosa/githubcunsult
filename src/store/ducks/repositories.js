const Types = {
    REMOVE_REPOSITORY: 'repositories/REMOVE_REPOSITORY',
    ADICIONAR_REPOSITORY: 'repositories/ADICIONAR_REPOSITORY'
}

const INITIAL_STATE = {
    repositories: []
}

export default function repositories(state = INITIAL_STATE, action) {
    console.log(action)
    console.log(state)
    switch(action.type) {
        case Types.REMOVE_REPOSITORY:
            return {...state, repositories: state.repositories.filter(element => element.name !== action.payload.repository)};
        case Types.ADICIONAR_REPOSITORY:
            return {...state, repositories: [...state.repositories, action.payload.repository]}

        default:
            return state;
    }
}

export const Creators = {
    removeRepository: repositoryName => ({
        type: Types.REMOVE_REPOSITORY,
        payload: {
            repository: repositoryName
        }
    }),
    adicionarRepository: repositoryName => ({
        type: Types.ADICIONAR_REPOSITORY,
        payload: {
            repository: repositoryName
        }
    })
}
