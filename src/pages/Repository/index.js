import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, State, Navigation } from './styles';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'Todas' },
      { state: 'open', label: 'Abertas' },
      { state: 'closed', label: 'Fechadas' },
    ],
    filterIndex: 0,
    page: 1,
    eof: false,
  };

  async componentDidMount() {
    this.loadIssues();
  }

  // Executado sempre que houver alterações de propriedades ou estados.
  async componentDidUpdate(_, prevState) {
    const { filterIndex } = this.state;

    if (prevState.filterIndex !== filterIndex) {
      this.loadIssues(1);
    }
  }

  async loadIssues(page) {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);
    const { filters, filterIndex } = this.state;

    try {
      const [repository, issues] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state: filters[filterIndex].state,
            per_page: 5,
            page,
          },
        }),
      ]);

      if (issues.data.length > 0) {
        this.setState({
          repository: repository.data,
          issues: issues.data,
          loading: false,
          eof: issues.data.length < 5,
          page,
        });
      } else {
        this.setState({ loading: false, eof: true });
      }
    } catch (err) {
      this.setState({ loading: false });
    }
  }

  handlePrevious() {
    const { page } = this.state;

    if (page > 1) {
      this.loadIssues(page - 1);
    }
  }

  handleNext() {
    const { page } = this.state;

    this.loadIssues(page + 1);
  }

  render() {
    const {
      repository,
      loading,
      issues,
      filters,
      filterIndex,
      page,
      eof,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <State active={filterIndex}>
          {filters.map((filter, index) => (
            <button
              type="button"
              key={filter.label}
              onClick={() => this.setState({ filterIndex: index, page: 1 })}
            >
              {filter.label}
            </button>
          ))}
        </State>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Navigation>
          <button
            type="button"
            disabled={page === 1}
            onClick={() => this.handlePrevious()}
          >
            Anterior
          </button>
          <span />
          <strong>Página {page}</strong>
          <span />
          <button
            type="button"
            disabled={eof}
            onClick={() => this.handleNext()}
          >
            Próxima
          </button>
        </Navigation>
      </Container>
    );
  }
}

Repository.propTypes = {
  macth: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
