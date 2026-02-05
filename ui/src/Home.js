import './App.css';
import "milligram";
import {useState} from "react";

const Home = () => {

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [data, setData] = useState({
        sepal_length: "",
        sepal_width: "",
        petal_length: "",
        petal_width: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const response = await fetch("/predict", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    sepal_length: Number(data.sepal_length),
                    sepal_width: Number(data.sepal_width),
                    petal_length: Number(data.petal_length),
                    petal_width: Number(data.petal_width)
                })
            });

            if (!response.ok) {
                throw new Error("Server error");
            }

            const json = await response.json();
            setPrediction(json.prediction);
            setLoading(false)
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div className="container">
            <div className="iris-container">
                <h2>
                    <center>Iris classifier</center>
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        name="sepal_length"
                        placeholder="Sepal length (cm)"
                        value={data.sepal_length}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        name="sepal_width"
                        placeholder="Sepal width (cm)"
                        value={data.sepal_width}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        name="petal_length"
                        placeholder="Petal length (cm)"
                        value={data.petal_length}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        name="petal_width"
                        placeholder="Petal width (cm)"
                        value={data.petal_width}
                        onChange={handleChange}
                        required
                    />

                    <center>
                        <button type="submit">Predict</button>
                    </center>
                </form>

                {loading && (
                    <center>
                        <div className="lds-facebook">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </center>
                )}


                {!loading && prediction && (
                    <p>
                        <strong>Prediction:</strong> {prediction}
                    </p>
                )}

                {error && (
                    <p style={{color: "red"}}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Home;