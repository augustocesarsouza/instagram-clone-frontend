import Url from "../../../Utils/Url";
import { ObjCreateMessageReels } from "./ShareReels";

export const CreateMessageReels = async (objShareReels: ObjCreateMessageReels) : Promise<Response> => {
  const createMessageRef = await fetch(`${Url}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objShareReels),
  });

  return createMessageRef;
}

