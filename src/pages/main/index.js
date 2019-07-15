import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import api from '../../services/api';
import { Form, SubmitButton, List } from './styles';
import { Container } from '../../components/Container';
import { Creators as repositoriesActions } from '../../store/ducks/repositories'

export class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
    };

    componentDidMount() {

        const repositories = localStorage.getItem('repositories');

        if(repositories) {
            JSON.parse(repositories).map(element => this.props.adicionarRepository(element))
        }
    }

    handleInputChange = ({ target }) => {
        this.props.changeInputText(target.value)
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { loading, setLoad, inputText, setRepositoryError } = this.props

        setLoad(true)
        console.log(loading)
        try {
            const response = await api.get(`/repos/${inputText}`)
            const data = {
                name: response.data.full_name,
            }
            this.props.adicionarRepository(data)
            localStorage.setItem('repositories', JSON.stringify(this.props.repositories))
            this.props.changeInputText('')
            setRepositoryError(false)
        }catch(err) {
            setRepositoryError(true)
        }
        setLoad(false)
    }

     handleDeleteItem = async (repositoryToDelete) => {
         await this.props.removeRepository(repositoryToDelete)
         localStorage.setItem('repositories', JSON.stringify(this.props.repositories))
    }
    render() {
        const { repositories, loading, repositoryError } = this.props;
        console.log(this.props)

        return (

            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input type="text"
                    onChange={this.handleInputChange}
                    value={this.props.inputText}
                    placeholder="Adicionar repositorio"/>
                    <SubmitButton loading={loading}>
                        {loading ? <FaSpinner/> : <FaPlus/>}

                    </SubmitButton>
                </Form>
                    {repositoryError && <span>Talvez esse Repositório não exista</span>}
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

const mapStateToProps = ({ repositories }) => ({ ...repositories })
const mapDispatchToProps = dispatch => bindActionCreators(repositoriesActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
