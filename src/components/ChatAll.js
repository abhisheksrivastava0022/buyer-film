import React from 'react'
import defaultimg from '../assets/img/default.jpg';
const ChatAll = () => {
    return (

        <div className='notification'>
            <ul>
                <li><span><i class="bi bi-chat-dots"></i></span></li>
                <li><a data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1"><i class="bi bi-bell"></i><sup>1</sup></a></li>
            </ul>
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample1" aria-labelledby="offcanvasExampleLabel1">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Notifications</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body ">
                    <div className='notification-list'>
                        <ul>
                            <li>
                                <div><img src={defaultimg} alt="" className='user-img-notification' /></div>
                                <div className='text-notification'>
                                    <p>1 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                                    </p>
                                    <p className='date'>4 months ago</p>
                                </div>
                            </li>
                            <li>
                                <div><img src={defaultimg} alt="" className='user-img-notification' /></div>
                                <div className='text-notification'>
                                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                                    </p>
                                    <p className='date'>4 months ago</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatAll