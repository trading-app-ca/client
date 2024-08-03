import React from 'react';
import Card from '../components/common/Card';
import CollapsibleSection from '../components/common/CollapsibleSection';

const Portfolio = () => {
  return (
    <div className="content-container">
      <div className="row">
        <Card title="Your Portfolio Overview">
          <p>Details about your portfolio.</p>
        </Card>
        <Card title="Recent transactions" className="short-card recent-transactions">
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum dolor sit amet.</p>
        </Card>
      </div>  
      <Card title="Asset List">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum non quod possimus aperiam maxime? Ipsum, ea mollitia. Deserunt, nesciunt hic.</p>
        <CollapsibleSection>
          <div className="placeholder-image">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, reiciendis. Minima explicabo error soluta reprehenderit pariatur non quos debitis nulla impedit rerum eius deserunt cupiditate esse neque omnis voluptatem magni, eveniet illum ipsam cum, vel et eum officiis? Eaque, nobis consequatur beatae dicta eum doloribus aliquam culpa dolor asperiores nisi?
          </div>
        </CollapsibleSection>
      </Card>
      <Card title="Portfolio Performance">
        <CollapsibleSection>
          <div className="placeholder-image">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur dolorum similique quibusdam natus accusamus sunt reiciendis enim, delectus earum! Sapiente, nemo voluptatem sed tempora odit dolore tempore velit officiis necessitatibus nihil in temporibus. Nostrum placeat cupiditate quibusdam harum minima praesentium alias repellendus temporibus aspernatur illo sunt deserunt, minus quasi ea!</div>
        </CollapsibleSection>
      </Card>
      <Card title="Portfolio Allocation">
        <CollapsibleSection>
          <div className="placeholder-image">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, libero dolorum? Inventore odio est recusandae explicabo eos, doloribus aut, ullam, beatae voluptatum animi iusto tempore voluptas? Facere, accusantium praesentium quos quidem assumenda omnis aliquid delectus aperiam? Consectetur unde numquam quisquam cupiditate praesentium. Explicabo, earum iusto! Labore accusamus perspiciatis est quia.</div>
        </CollapsibleSection>
      </Card>
    </div>
  );
};

export default Portfolio;
