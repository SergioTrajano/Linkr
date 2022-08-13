import * as S from "./styles";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PublishContext } from "../../providers/UserPublishProvider";
import { LoadingContext } from "../../providers/LoadingProvider";
import isLogged from "../../utils/isLogged";
import getUserData from "../../utils/getUserData";
const UserPublish = () => {
    
    return (
        <S.BoxPublish>
            <S.Container>
                <S.Data>
                    <S.ImageUser>
                        
                    </S.ImageUser>
                    <S.Form >
                        <p>What are you going to share today?</p>
                        <S.Inputs>
                            <input
                                type="url"
                                className="inputUrl"
                                placeholder="  http://..."
                                required
                            ></input>
                            <input
                                type="text"
                                className="inputArticle"
                                placeholder="  Awesome article about #Sql"
                            ></input>
                        </S.Inputs>
                        <S.Button>
                            <button
                                type="submit"
                                className="PublishButton"
                            >
                               
                            </button>
                        </S.Button>
                    </S.Form>
                </S.Data>
            </S.Container>
        </S.BoxPublish>
    );
};

export default UserPublish;