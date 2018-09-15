import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxs from '../Auxs/Auxs'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount () {
            this.reqInerceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });

            this.resInerceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInerceptor);
            axios.interceptors.response.eject(this.resInerceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render () {
            return (
                <Auxs>
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message: null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Auxs>
            );
        };
    };
};

export default withErrorHandler;