/* eslint-disable react/prop-types */
// Utils
import { millisecondstToDay } from '../../utils/computeTimeUtils';
// Styles
import './EmployeesPairTable.css';

const EmployeesPairTable = ({ pair }) => {
  return (
    <section className="employees-container">
      <article className="employees-card">
        <h3>Collaborative Projects</h3>
        <table className="center">
          <thead>
            <tr className="border-bottom">
              <th>Employee ID #1</th>
              <th>Employee ID #2</th>
              <th>Project ID</th>
              <th>Days worked</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(pair.projects).map((projectKey, i) => (
              <tr className="border-bottom" key={i}>
                <td>{pair.firstEmployee}</td>
                <td>{pair.secondEmployee}</td>
                <td>{projectKey}</td>
                <td>
                  {millisecondstToDay(
                    pair.projects[projectKey].collaborativeTime
                  )}
                </td>
              </tr>
            ))}
            <tr className="border-bottom">
              <td colSpan="3">Total duration of collaborative work</td>
              <td>{millisecondstToDay(pair.combinedWorkDuration)}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default EmployeesPairTable;
