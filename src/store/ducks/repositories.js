const Types = {
    REMOVE_REPOSITORY: 'repositories/REMOVE_REPOSITORY',
    INPUT_TEXT: 'repositories/INPUT_TEXT',
    LOADING: 'repositories/LOADING',
    ADICIONAR_REPOSITORY: 'repositories/ADICIONAR_REPOSITORY',
    REPOSITORY_ERROR: 'repositories/REPOSITORY_ERROR'
}

const INITIAL_STATE = {
    repositories: [],
    inputText: '',
    loading: false,
    repositoryError: false
}

export default function repositories(state = INITIAL_STATE, action) {
    switch(action.type) {
        case Types.REMOVE_REPOSITORY:
            return {...state, repositories: state.repositories.filter(element => element.name !== action.payload.repository)};
        case Types.ADICIONAR_REPOSITORY:
            return {...state, repositories: [action.payload.repository]}
        case Types.INPUT_TEXT:
            return {...state, inputText: action.payload.text}
        case Types.LOADING:
            return {...state, loading: action.payload.loading}
        case Types.REPOSITORY_ERROR:
            return {...state, repositoryError: action.payload.error}
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
    setLoad: boolean => ({
        type: Types.LOADING,
        payload: {
            loading: boolean
        }
    }),
    adicionarRepository: repositoryName => ({
        type: Types.ADICIONAR_REPOSITORY,
        payload: {
            repository: repositoryName
        }
    }),
    setRepositoryError: boolean => ({
        type: Types.REPOSITORY_ERROR,
        payload: {
            error: boolean
        }
    })
}
