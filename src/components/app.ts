import Table from './table';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import CarsCollection from '../helpers/cars-collection';
import SelectField from './select-field';
import CarJoined from '../types/car-joined';
// eslint-disable-next-line import/no-duplicates
import stringifyProps, { StringifiedObject } from '../helpers/stringify-props';

type CarTableRow = Required<StringifiedObject<CarJoined>>;

const ALL_CATEGORIES_ID = '-1';
const ALL_CATEGORIES_TITLE = 'Visi automobiliai';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private carsTable: Table<CarTableRow>;

  private selectedBrandId: string;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    this.carsCollection = new CarsCollection({ cars, brands, models });

    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);

    this.htmlElement = foundElement;
    this.carsTable = new Table({
      title: ALL_CATEGORIES_TITLE,
      columns: {
        id: 'Id',
        brand: 'Markė',
        model: 'Modelis',
        price: 'Kaina',
        year: 'Metai',
      },
      rowsData: this.carsCollection.all.map(stringifyProps),
    });
    this.selectedBrandId = All_CATEGORIES_ID;
  }

  private handleCategoryChange = (brandId: string) => {
    this.selectedBrandId = brandId;

    this.update();
  };

  private update = (): void => {
    if (this.selectedBrandId === ALL_CATEGORIES_ID) {
      this.carsTable.updateProps({
        title: ALL_CATEGORIES_TITLE,
        rowsData: this.carsCollection.getByBrandId(brandId) ?? 'Nera pavadinimo',
      });
    } else {
      const brandTitle = brands
      .find((brand) => brand.id === this.selectedBrandId)?.title;
      this.carsTable.updateProps({
        title: brandTitle,
        rowsData: this.carsCollection.getByBrandId(this.selectedBrandId)
        .map(formatCarTableRow),
    });
  }
};

  public initialize = (): void => {
    const categorySelect = new SelectField({
      label: 'Markės',
      options: [
        { label: ALL_CATEGORIES_TITLE, value: All_CATEGORIES_ID },
        ...brands.map((brand) => ({
          label: brand.title,
          value: brand.id,
        })),
      ],
      // eslint-disable-next-line no-console
      onChange: this.handleCategoryChange,
    });

    const container = document.createElement('div');
    container.className = 'container my-5';
    container.append(
      categorySelect.htmlElement,
      this.carsTable.htmlElement
    );

    this.htmlElement.append(container);
  };
}

export default App;
