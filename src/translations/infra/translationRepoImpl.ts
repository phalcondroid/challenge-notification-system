import { Translation } from "../../shared/contracts/translations/entities/translation";
import { Locale } from "../../shared/contracts/translations/enums/locale.enum";
import { TranslationRepository } from "../../shared/contracts/translations/infrastructure/translation.repository";
import { TranslationModel } from "./models/translation.model";

export class TranslationRepoImpl implements TranslationRepository {

  /**
   * Connects with data provider ports or frameworks to get string business by key translated.
   * @param string key 
   * @param string param 
   * @param Locale locale 
   * @returns Translation
   */
  public getByKey(key: string, param: string = "", locale: Locale = Locale.en): Translation {
    if (key === 'FRIEND_REQUEST') {
      return new TranslationModel({
        id: "uuid.v4(1)",
        key: "FRIEND_REQUEST",
        locale: locale,
        value:`Player '${param}' has sent you a friend request.`
      });
    }
    if (key === 'ITEM_ACQUIRED') {
      return new TranslationModel({
        id: "uuid.v4(2)",
        key: "ITEM_ACQUIRED",
        locale: locale,
        value: `You've acquired the legendary ${param}!`
      });
    }
    return new TranslationModel({
      id: "uuid.v4(3)",
      key: "LEVEL_UP",
      locale: locale,
      value: `Congratulations! You've reached level ${param}!`
    });
  }
}