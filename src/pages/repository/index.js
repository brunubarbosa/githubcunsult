import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { Loading, Owner, IssuesList, IssueDetail } from './styles';
import { Container } from '../../components/Container';

export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            })
        }).isRequired,
    }
    state = {
        repository: {},
        issues: [],
        loading: true,
    }
    async componentDidMount() {
        const { match } = this.props;

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
        console.log(issues)
        this.setState({
            repository: repository.data,
            issues: issues.data.map(issue => ({...issue, isExpanded: false})),
            loading: false,
        })


    }

    handleExpandIssue(issueIndex) {
        const newIssues = this.state.issues.map((issue, index) => index === issueIndex ? {...issue, isExpanded: !issue.isExpanded} : {...issue, isExpanded: false} )
        this.setState({issues: newIssues})
    }


    render() {
        const { repository, issues, loading } = this.state;
        console.log(issues)
        if(loading) {
            return <Loading>Carregando</Loading>
        }
        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <IssuesList >
                    {issues.map((issue, index) => (
                        <div onClick={() => this.handleExpandIssue(index)}>

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
            </Container>
        )
    }
}
