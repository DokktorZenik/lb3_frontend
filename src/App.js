import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {

    const [form, setForm] = useState({
        createdBy: "",
        filmName: "",
        reviewContent: ""
    });

    const [reviews, setReviews] = useState([])

    const toggleStart = () => {
        axios.post("http://localhost:5276/start")
            .then(res => {
                window.alert(res.data)
            })
            .catch(err => console.log(err));
    }

    const toggleCheck = () => {
        axios.get("http://localhost:5276/status")
            .then(res => {
                window.alert(res.data)
            })
            .catch(err => console.log(err));
    }

    const toggleResult = () => {
        axios.post("http://localhost:5276/predict", {...form, reviewDate: new Date().toISOString().split('T')[0]}
        )
            .then(res => {
                window.alert(res.data)
            })
            .catch(err => console.log(err));
    }

    const toggleReviews = () => {
        axios.get("http://localhost:5276/reviews")
            .then(res => {
                setReviews(res.data)
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="App">
            <div className="form-wrapper">
                <div className="form-container">
                    <div className="input-container">
                        <p className="createdBy__label">Created By:</p>
                        <input type="text" className="createdBy__input"
                               onChange={e => setForm({...form, createdBy: e.target.value})} value={form.createdBy}/>
                        <p>Film:</p>
                        <input type="text" className="film" onChange={e => setForm({...form, filmName: e.target.value})}
                               value={form.filmName}/>
                        <p>Review:</p>
                        <textarea onChange={e => setForm({...form, reviewContent: e.target.value})}
                                  value={form.reviewContent}/>
                    </div>
                    <div className="button-wrapper">
                        <div className="button green" onClick={toggleStart}>
                            START
                        </div>
                        <div className="button check" onClick={toggleCheck}>
                            CHECK
                        </div>
                        <div className="button green" onClick={toggleResult}>
                            APPLY
                        </div>
                    </div>
                </div>
            </div>
            <div className="review-form">
                <div className="reviews">
                    {reviews.map(review => (
                        <div className="review">
                            <div className="date separator">
                                {review.reviewDate}
                            </div>
                            <div className="person separator">
                                {review.createdBy}
                            </div>
                            <div className="content">
                                <p className="film_name">
                                    {review.filmName}
                                </p>
                                <p className="review_content">
                                    {review.reviewContent}
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="button green" onClick={toggleReviews}>
                    UPDATE
                </div>
            </div>
        </div>
    );
}

export default App;
