import PGEventsDS from "./source/PGEventsDS"
import providePool from "../../database"

export default function providePGEventsDS() {
    return new PGEventsDS(providePool())
}