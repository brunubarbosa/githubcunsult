import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { Form, SubmitButton, List } from './styles';
import { Container } from '../../components/Container';

class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
    };

    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if(repositories) {
            this.setState({ repositories: JSON.parse(repositories) })
        }
    }

    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;

        if(prevState.repositories != repositories) {

            localStorage.setItem('repositories', JSON.stringify(repositories))
        }
    }

    handleInputChange = e => {
        this.setState({newRepo: e.target.value})
    }

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({loading: true});

        const { newRepo, repositories } = this.state;
        try {
            const response = await api.get(`/repos/${newRepo}`)
            const data = {
                name: response.data.full_name,
            }
            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
            })
        }catch(err) {
            console.log(err)
        }

        this.setState({loading: false});
    }

     handleDeleteItem = (repositoryToDelete) => {
         let { repositories } = this.state
         this.setState({...this.state, repositories: repositories.filter(element => element.name !== repositoryToDelete)})
         localStorage.setItem('repositories', JSON.stringify(this.state.repositories))

    }
    render() {
        const { newRepo, repositories, loading } = this.state;

        return (

            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input type="text"
                    onChange={this.handleInputChange}
                    value={newRepo}
                    placeholder="Adicionar repositorio"/>
                    <SubmitButton loading={loading}>
                        {loading ? <FaSpinner/> : <FaPlus/>}

                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <div>

                            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                            <FaTimes color="red" cursor="pointer" onClick={() => this.handleDeleteItem(repository.name)} />
                            </div>
                        </li>
                    ))}
                </List>
            </Container>
        )
    }
}

export default Main;
