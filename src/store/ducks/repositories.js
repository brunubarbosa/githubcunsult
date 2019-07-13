const Types = {
    REMOVE_REPOSITORY: 'repositories/REMOVE_REPOSITORY',
    INPUT_TEXT: 'repositories/INPUT_TEXT',
    ADICIONAR_REPOSITORY: 'repositories/ADICIONAR_REPOSITORY'
}

const INITIAL_STATE = {
    repositories: [],
    inputText: ''
}

export default function repositories(state = INITIAL_STATE, action) {
    switch(action.type) {
        case Types.REMOVE_REPOSITORY:
            return {...state, repositories: state.repositories.filter(element => element.name !== action.payload.repository)};
        case Types.ADICIONAR_REPOSITORY:
            return {...state, repositories: [...state.repositories, action.payload.repository]}
        case Types.INPUT_TEXT:
            return {...state, inputText: action.payload.text}

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
    changeInputText: text => ({
        type: Types.INPUT_TEXT,
        payload: {
            text,
        }
    }),
    adicionarRepository: repositoryName => ({
        type: Types.ADICIONAR_REPOSITORY,
        payload: {
            repository: repositoryName
        }
    })
}
