import React, { Component, MouseEvent } from 'react';


const API_URL = require('./config.json').apiUrl;

interface IKeyValue {
    key: string;
    value: string;
}

interface IState extends IKeyValue {
    lookupKey: string;
    loading: boolean;
    error: string;
    message: string;
}

class App extends Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            key: '',
            value: '',
            lookupKey: '',
            loading: false,
            error: '',
            message: '',
        };
    }

    getKv = async (event: MouseEvent) => {
        event.preventDefault();
        const { lookupKey } = this.state;

        if (!lookupKey.trim()) {
            this.setState({ error: 'Key is required for fetch', message: '' });
            return;
        }

        this.setState({ loading: true, error: '', message: '' });
        try {
            const resp = await fetch(`${API_URL}/${lookupKey}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (resp.status === 404) {
                this.setState({ value: '', message: 'Key not found' });
                return;
            }

            const body = await resp.json();
            if (!resp.ok) {
                this.setState({ error: body?.error || 'Failed to fetch key' });
                return;
            }

            this.setState({ key: body.key || lookupKey, value: body.value || '', message: 'Key fetched successfully' });
        } catch (e) {
            this.setState({ error: 'Unable to reach API' });
        } finally {
            this.setState({ loading: false });
        }
    };

    postKv = async (event: MouseEvent) => {
        event.preventDefault();
        const { key, value } = this.state;

        if (!key.trim() || !value.trim()) {
            this.setState({ error: 'Both key and value are required', message: '' });
            return;
        }

        this.setState({ loading: true, error: '', message: '' });
        try {
            const resp = await fetch(API_URL, {
                method: 'post',
                body: JSON.stringify({ key, value }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const body = await resp.json();

            if (resp.status === 409) {
                this.setState({ message: 'Key already exists. Choose a new key.' });
                return;
            }

            if (!resp.ok) {
                this.setState({ error: body?.error || 'Failed to store key/value' });
                return;
            }

            this.setState({ key: '', value: '', message: 'Key/value stored successfully' });
        } catch (e) {
            this.setState({ error: 'Unable to reach API' });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { key, value, lookupKey, error, message, loading } = this.state;

        return (
            <div>
                <p>add a key and value</p>
                <div>
                    <label htmlFor="create-key-input">key: </label>
                    <input type="text" id="create-key-input" value={key} onChange={event => this.setState({ key: event.target.value })} />
                </div>
                <div>
                    <label htmlFor="create-value-input">value: </label>
                    <input type="text" id="create-value-input" value={value} onChange={event => this.setState({ value: event.target.value })} />
                    <button onClick={this.postKv} disabled={loading}>submit</button>
                </div>
                <hr />
                <p>fetch a value</p>
                <div>
                    <label htmlFor="fetch-key-input">key: </label>
                    <input type="text" id="fetch-key-input" value={lookupKey} onChange={event => this.setState({ lookupKey: event.target.value })} />
                    <button onClick={this.getKv} disabled={loading}>submit</button>
                </div>
                <div>
                    <label htmlFor="value-field">value: </label>
                    <strong><span id="value-field"></span>{value}</strong>
                </div>
                {loading && <p>Loading...</p>}
                {message && <p>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        )
    }
}

export default App;
