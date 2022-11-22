import { Product } from '@stripe/firestore-stripe-payments'
import { CheckIcon, XIcon } from '@heroicons/react/solid'

interface Props {
	plans: Product[],
	selectedPlan: Product | null
}

const Table = ({ plans, selectedPlan }: Props) => {
	return (
		<table>
			<tbody className="divide-y divide-[gray]">
				<tr className="tableRow">
					<td className="tableDataTitle">Monthly price</td>
					{plans.map((plan) => (
						<td key={ plan.id } className={`tableDataFeature ${
							selectedPlan?.id === plan.id 
							? "text-[#e50914]"
							: "text-[gray]"
						}`}>
							&euro;{ plan.prices[0].unit_amount! / 100 }
						</td>
					))}
				</tr>
				<tr className="tableRow">
					<td className="tableDataTitle">Video quality</td>
					{plans.map((plan) => (
						<td key={ plan.id } className={`tableDataFeature ${
							selectedPlan?.id === plan.id 
							? "text-[#e50914]"
							: "text-[gray]"
						}`}>
							{ plan.metadata.videoQuality }
						</td>
					))}
				</tr> 
				<tr className="tableRow">
					<td className="tableDataTitle">Resolution</td>
					{plans.map((plan) => (
						<td key={ plan.id } className={`tableDataFeature ${
							selectedPlan?.id === plan.id 
							? "text-[#e50914]"
							: "text-[gray]"
						}`}>
							{ plan.metadata.resolution }
						</td>
					))}
				</tr>
				<tr className="tableRow">
					<td className="tableDataTitle">Watch on your TV, computer, mobile phone and tablet</td>
					{plans.map((plan) => (
						<td key={ plan.id } className={`tableDataFeature ${
							selectedPlan?.id === plan.id 
							? "text-[#e50914]"
							: "text-[gray]"
						}`}>
							{ plan.metadata.portability === 'true' ? (
								<CheckIcon className="inline-block h-8 w-8" />
							) : (
								<XIcon className="inline-block h-8 w-8" />
							) }
						</td>
					))}
				</tr>
			</tbody>
		</table>
	)
}

export default Table
	
