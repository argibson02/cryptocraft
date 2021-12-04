import React from 'react';
// import './GraphContainer.css';
import IndividualGraph from './Graph.js';
import { graphData } from '../../GraphData.js';

const GraphContainer = () => {
    return (
        <div className="container">
            <div className="row mb-3">
                <section className="portfolio">
                    <div className="row project-row">
                        {graphData.map((graph) => (
                            <IndividualGraph key={graph.ticker} graph={graph} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default GraphContainer;