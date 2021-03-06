import React from 'react';
import './Dictionary.css';
import DictionaryWord from './DictionaryWord.js';

class Dictionary extends React.Component {
    state = {
        words: '',
    };

    componentDidMount() {
        this.callApi()
            .then((res) => this.setState({ words: res }))
            .catch((err) => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/words');
        const body = await response.json();
        return body;
    };

    render() {
        return (
            <div>
                <main>
                    <div id="container">
                        {this.state.words
                            ? this.state.words.map((w) => {
                                  return <DictionaryWord key={w.id} word_name={w.name} word_meaning={w.meaning} />;
                              })
                            : ''}
                    </div>
                </main>
            </div>
        );
    }
}

export default Dictionary;
