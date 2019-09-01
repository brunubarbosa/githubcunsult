import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { Creators as issuesActions } from '../../store/ducks/issues'
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Loading, Owner, IssuesList, IssueDetail } from './styles';
import { Container } from '../../components/Container';

export function Repository(props) {
    console.log(props)
    const [ state, setState] = useState({})
    useEffect( async () => {
        const { match } = props;

        const repoName =  decodeURIComponent(match.params.repository)


        const [repository, issues] = await Promise.all([
            await api.get(`/repos/${repoName}`),
            await api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: 'open',
                    per_page: 10,
                }
            })
        ])
        setState({
            repository: repository.data,
            loading: false,
        })
        props.setIssues(issues.data.map(issue => ({...issue, isExpanded: false})))


    }, [])

    const handleExpandIssue = (issueIndex) => props.expandIssue(issueIndex)


    const { repository, loading } = state;
    console.log(props)
    console.log('props')
    return (
        !loading ?
            (<Container>
                {repository &&
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>}

            <IssuesList >
                {props.issues && props.issues.map((issue, index) => (
                    <div onClick={() => handleExpandIssue(index)}>

                        <li key={String((issue, index).id)} onClick={()=>{}}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={label.id}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                        <IssueDetail className={`${issue.isExpanded ? '' : '--disabled'}`} >
                            <span>{issue.created_at}</span>
                            <span>{issue.body}</span>
                        </IssueDetail>
                    </div>
                ))}
            </IssuesList>
        </Container>) : <Loading>Carregando</Loading>
    )
}

const mapStateToProps = (issues) => issues

const mapDispatchToProps = dispatch => bindActionCreators(issuesActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Repository)
