import "./progress.page.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ProgressPage() {

  const data = {
    labels: [
      'Total places',
    ],
    datasets: [{
      label: 'Total places',
      data: [100,20],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'blue'
      ],
      hoverOffset: 1
    }]
  };

  return (
    <div className="main" >
      <div className="progress-container">
        <div className="progress-piechart">
          <Pie data={data} />
        </div>
        <div className="progress-linegraphs">
          <progress max={100} value={50}></progress>
          <progress max={100} value={80}></progress>
          <progress max={100} value={40}></progress>
        </div>
        <div className="progress-recommendations">
          <h2>Recommendations</h2>
          <div className="card-container">
            <div className="card">
              <div className="card-image">
                <img src="https://www.discovercharlottetown.com/wp/wp-content/uploads/2023/03/24-reasons-to-visit-charlottetown-in-2024.jpg" alt="" />
              </div>
              <div className="card-content">
                <h4>place</h4>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, tenetur rerum ab laudantium pariatur numquam, sapiente a voluptatem est nemo placeat adipisci quo?</span>
              </div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="https://www.discovercharlottetown.com/wp/wp-content/uploads/2023/03/24-reasons-to-visit-charlottetown-in-2024.jpg" alt="" />
              </div>
              <div className="card-content">
                <h4>place</h4>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, tenetur rerum ab laudantium pariatur numquam, sapiente a voluptatem est nemo placeat adipisci quo?</span>
              </div>
            </div>
            <div className="card">
              <div className="card-image">
                <img src="https://www.discovercharlottetown.com/wp/wp-content/uploads/2023/03/24-reasons-to-visit-charlottetown-in-2024.jpg" alt="" />
              </div>
              <div className="card-content">
                <h4>place</h4>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, tenetur rerum ab laudantium pariatur numquam, sapiente a voluptatem est nemo placeat adipisci quo?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPage