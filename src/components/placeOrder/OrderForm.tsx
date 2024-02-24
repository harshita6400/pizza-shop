import React, { ChangeEvent } from "react"
import { PlaceOrderInterface } from "../../interface/orderInterface"
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { toTitleCase } from "../../utils/utils"

interface IProps {
    step: number
    formLabel: string
    name: "type" | "size" | "base"
    values: Array<string>
    value: PlaceOrderInterface
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleStepChange: (stepChange: "next" | "prev") => void
}

export const OrderForm: React.FC<IProps> = React.memo(({ step, formLabel, name, values, value, handleChange, handleStepChange }) => {
    return (
        <>
            <FormControl sx={{ m: 3 }} variant="standard">
                <FormLabel>{formLabel}</FormLabel>
                <RadioGroup name={name} value={value[name]} onChange={handleChange}>
                    {
                        values.map((item, index) => (
                            <FormControlLabel
                                key={index}
                                value={item}
                                control={<Radio />}
                                label={toTitleCase(item)}
                            />
                        ))
                    }
                </RadioGroup>
                <div>

                    <Button
                        sx={{ mt: 1, mr: 1 }}
                        onClick={() => handleStepChange("prev")}
                        variant="outlined"
                        disabled={step === 1}
                    >
                        Back
                    </Button>

                    <Button
                        sx={{ mt: 1, mr: 1 }}
                        onClick={() => handleStepChange("next")}
                        variant="contained"
                    >
                        {step === 3 ? "Place Order" : "Next"}
                    </Button>
                </div>
            </FormControl>
        </>
    )
}
)
