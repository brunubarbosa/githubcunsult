const Types = {
    EXPAND_ISSUE: 'issues/EXPAND_ISSUE',
    SET_ITEMS: 'issues/SET_ITEMS',
}

const INITIAL_STATE = []


export default function issues(state = INITIAL_STATE, action) {
    switch(action.type) {
        case Types.EXPAND_ISSUE:
            return [
                ...state.map((issue, index) => (
                    index === action.payload.issueIndex ?
                    {...issue, isExpanded: !issue.isExpanded} :
                    {...issue, isExpanded: false}
                ) )
            ]
        case Types.SET_ITEMS:
            return [...action.payload.items]
        default:
            return state
    }
}

export const Creators = {
    expandIssue: issueIndex => ({
        type: Types.EXPAND_ISSUE,
        payload: {
            issueIndex,
        }
    }),
    setIssues: items => ({
        type: Types.SET_ITEMS,
        payload: {
            items,
        }
    })
}
